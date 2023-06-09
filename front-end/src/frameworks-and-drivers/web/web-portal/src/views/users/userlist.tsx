import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  MantineReactTable,
  MRT_ColumnDef, MRT_ColumnFiltersState,
  MRT_Row, MRT_SortingState,
} from 'mantine-react-table';
import {
  Box,
  ActionIcon,
  Tooltip, Container,
} from '@mantine/core';
import {IconTrash, IconId} from '@tabler/icons-react';
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
  const [isLoaded, setIsLoaded] = useState(false);

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
    fetchData()
      .then(() => setIsLoaded(true));
  }, [columnFilters, pagination, globalFilter, sorting]);

  const handleDeleteRow = (
    (row: MRT_Row<AppUserViewModel>) => {
      if (
        !confirm(`Bạn có chắc muốn vô hiệu hoá ${row.getValue('name')}`)
      ) {
        return;
      }
      appUserController.deleteUser(row.getValue('id'))
        .then(() => fetchData())
        .catch((error) => alert("Không thể vô hiệu hoá người dùng"));
    }
  );

  const columns = useMemo<MRT_ColumnDef<AppUserViewModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên người dùng',
        size: 130,
      },
      {
        accessorKey: 'phone',
        header: 'Số điện thoại',
        size: 10,
      },
      {
        accessorKey: 'addressName',
        header: 'Địa chỉ',
        size: 400,
      },
    ],
    [],
  );

  return (
    <Container fluid>
      <PageTitle title={"Quản lý người dùng"}></PageTitle>
      <MantineReactTable
        columns={columns}
        data={tableData}

        enableFilterMatchHighlighting={false}
        enableFullScreenToggle={false}
        enableRowActions={true}
        enableHiding={false}

        manualSorting
        onSortingChange={setSorting}

        manualFiltering
        onGlobalFilterChange={setGlobalFilter}
        onColumnFiltersChange={setColumnFilters}
        initialState={{
          showGlobalFilter: true,
        }}

        mantineSearchTextInputProps={{
          placeholder: 'Tìm kiếm',
        }}

        mantinePaginationProps={{
          showFirstLastPageButtons: true,
          showRowsPerPage: false,
        }}
        manualPagination
        rowCount={totalRows}
        onPaginationChange={setPagination}

        state={{pagination, globalFilter, columnFilters, sorting, isLoading: !isLoaded}}

        renderRowActions={({row, table}) => (
          <Box sx={{display: 'flex', gap: '16px'}}>
            <Tooltip withArrow position="right" label="Chi tiết">
              <ActionIcon color="blue" onClick={() => {
                navigate(row.original.id)
              }}>
                <IconId/>
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Xoá">
              <ActionIcon color="red" onClick={() => {
                handleDeleteRow(row)
              }}>
                <IconTrash/>
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Hành động'
          },
        }}

        positionActionsColumn="last"
      />
    </Container>
  );
};

export default AppUserList;
