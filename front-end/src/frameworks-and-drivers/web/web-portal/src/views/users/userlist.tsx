import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  MantineReactTable,
  MantineReactTableProps,
  MRT_Cell,
  MRT_ColumnDef, MRT_ColumnFiltersState,
  MRT_Row, MRT_SortingState,
} from 'mantine-react-table';
import {
  Box,
  ActionIcon,
  Tooltip, Container,
} from '@mantine/core';
import {IconTrash, IconEdit, IconId} from '@tabler/icons-react';
import {AppUserListViewModel, AppUserViewModel} from "@front-end/interface-adapters/view-models/app-user";
import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUserApi} from "@front-end/frameworks-and-drivers/app-sync/user";
import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserInteractor} from "@front-end/application/interactors/app-user";
import {AppUserController} from "@front-end/interface-adapters/controllers/app-user";
import {Query, UserFilter} from "@front-end/shared/utils";
import {useNavigate} from "react-router-dom";
import {PageTitle} from "../../components/page-title/page-title";


const AppUserList = () => {
  const appUserRepository: AppUserRepository = new AppUserApi();
  const appUserUseCase: AppUserUseCase = new AppUserInteractor(appUserRepository);
  const appUserController: AppUserController = new AppUserController(appUserUseCase);

  const [totalRows, setTotalRows] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [tableData, setTableData] = useState<AppUserViewModel[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const navigate = useNavigate();

  const filterConvert = (filter: MRT_ColumnFiltersState) => {
    const result: UserFilter = {};
    filter.forEach((f) => {
      result[f.id] = f.value as string;
    });
    return result;
  }

  const sortingConvert = (sorting: MRT_SortingState): { sort?: string, order?: string } => {
    if (sorting.length === 0) return {};
    return {
      sort: sorting.at(0)?.id,
      order: sorting.at(0)?.desc ? "desc" : "asc"
    };
  }

  const fetchData = async () => {
    const {sort, order} = sortingConvert(sorting);
    const query: Query = {
      search: globalFilter,
      filter: filterConvert(columnFilters),
      sortBy: sort,
      orderBy: order,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }
    const userList = await appUserController.getUserList(query)
      .then((users) => {
        return users;
      })
      .catch((error) => {
        return {
          users: [],
          page: 0,
          total: 0
        } as AppUserListViewModel
      });
    setTableData(userList.users);
    setTotalRows(userList.total);
  };


  useEffect(() => {
    if (pagination.pageIndex * pagination.pageSize > totalRows)
      setPagination({...pagination, pageIndex: 0});
    fetchData();
  }, [columnFilters, pagination, globalFilter, sorting]);

  const handleSaveRowEdits: MantineReactTableProps<AppUserViewModel>['onEditingRowSave'] =
    async ({exitEditingMode, row, values}) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        await appUserController.updateUser(values)
          .then(() => setTableData([...tableData]))
          .catch((error) => alert("Cannot update user"));
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = (
    (row: MRT_Row<AppUserViewModel>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('name')}`)
      ) {
        return;
      }
      appUserController.deleteUser(row.getValue('id'))
        .then(() => fetchData())
        .catch((error) => alert("Cannot delete user"));
    }
  );

  const getCommonEditTextInputProps = useCallback(
    (
      cell: MRT_Cell<AppUserViewModel>,
    ): MRT_ColumnDef<AppUserViewModel>['mantineEditTextInputProps'] => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<AppUserViewModel>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false, //disable editing on this column
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 140,
        mantineEditTextInputProps: ({cell}) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 140,
        mantineEditTextInputProps: ({cell}) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 50,
        mantineEditTextInputProps: ({cell}) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 180,
        mantineEditTextInputProps: ({cell}) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
    ],
    [getCommonEditTextInputProps],
  );

  return (
    <Container fluid>
      <PageTitle title={"Users Management"}></PageTitle>
      <MantineReactTable
        columns={columns}
        data={tableData}

        editingMode="modal" //default
        enableFilterMatchHighlighting={false}
        enableEditing
        enableFullScreenToggle={false}

        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}

        manualSorting
        onSortingChange={setSorting}

        manualFiltering
        onGlobalFilterChange={setGlobalFilter}
        onColumnFiltersChange={setColumnFilters}
        initialState={{
          showGlobalFilter: true,
        }}

        mantinePaginationProps={{
          showFirstLastPageButtons: true,
          showRowsPerPage: false,
        }}
        manualPagination
        rowCount={totalRows}
        onPaginationChange={setPagination}

        state={{pagination, globalFilter, columnFilters, sorting}}

        renderRowActions={({row, table}) => (
          <Box sx={{display: 'flex', gap: '16px'}}>
            <Tooltip withArrow position="right" label="Info">
              <ActionIcon color="blue" onClick={() => {
                navigate(row.original.id)
              }}>
                <IconId/>
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="left" label="Edit">
              <ActionIcon color="teal" onClick={() => table.setEditingRow(row)}>
                <IconEdit/>
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Delete">
              <ActionIcon color="red" onClick={() => {
                handleDeleteRow(row)
              }}>
                <IconTrash/>
              </ActionIcon>
            </Tooltip>
          </Box>
        )}

        positionActionsColumn="last"
      />
    </Container>
  );
};

const validateRequired = (value: string) => value.length > 0;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export default AppUserList;
