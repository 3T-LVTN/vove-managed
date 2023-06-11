import {ActionIcon, Badge, Container} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useEffect, useMemo, useState} from "react";
import {MantineReactTable, MRT_ColumnDef, MRT_SortingState} from "mantine-react-table";
import {Query} from "@front-end/shared/utils";
import {IconArrowUpRight} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {Status} from "@front-end/domain/entities/inquiry";

const data: RowData[] = [
  {
    id: "001",
    title: "Cần thêm thông tin về nguồn dữ liệu và độ chính xác",
    time: "2023-05-01 5:51:00",
    author: "Mai Thy",
    lastResponse: "User",
    status: Status.WAITING,
  },
  {
    id: "002",
    title: "Improve disease outbreak tracking",
    time: "2023-05-02 09:15:00",
    author: "Le Tran Hoang Thinh",
    lastResponse: "Admin",
    status: Status.WAITING,
  },
  {
    id: "003",
    title: "Add vaccine availability information",
    time: "2023-05-03 17:20:00",
    author: "Ung Tuong Phat",
    lastResponse: "User",
    status: Status.WAITING,
  },
  {
    id: "004",
    title: "Improve symptom tracking",
    time: "2023-05-04 11:00:00",
    author: "Bui Hai Duong",
    lastResponse: "Admin",
    status: Status.WAITING,
  },
  {
    id: "005",
    title: "Add personalized recommendations",
    time: "2023-05-05 15:30:00",
    author: "Doan Thuy Ha",
    lastResponse: "User",
    status: Status.WAITING,
  },
  {
    id: "006",
    title: "Improve data accuracy",
    time: "2023-05-03 12:27:00",
    author: "Le Tran Hoang Thinh",
    lastResponse: "Admin",
    status: Status.WAITING,
  },
  {
    id: "007",
    title: "Add support for multiple languages",
    time: "2023-05-03 12:35:00",
    author: "Ung Binh Nguyen",
    lastResponse: "User",
    status: Status.WAITING,
  },
  {
    id: "008",
    title: "Improve app accessibility",
    time: "2023-05-03 12:30:00",
    author: "Thoa Ngoc Uyen",
    lastResponse: "Admin",
    status: Status.WAITING,
  },
  {
    id: "009",
    title: "The predict results in my living area is incorrect",
    time: "2023-05-06 19:00:00",
    author: "Nguyen Mai Thy",
    lastResponse: "Admin",
    status: Status.WAITING,
  },
  {
    id: "010",
    title: "Add travel advisories for disease outbreaks",
    time: "2023-05-09 14:45:00",
    author: "Le Tran Hoang Thinh",
    lastResponse: "User",
    status: Status.WAITING,
  },
];

interface RowData {
  id: string;
  title: string;
  time: string;
  author: string;
  lastResponse: "User" | "Admin";
  status: Status;
}

const InquiryList = () => {
  const [totalRows, setTotalRows] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [tableData, setTableData] = useState<RowData[]>([]);

  const navigate = useNavigate();

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
      sortBy: sort,
      orderBy: order,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }
    //TODO: call api
    setTableData(data);
    setTotalRows(15);
  };

  useEffect(() => {
    if (pagination.pageIndex * pagination.pageSize > totalRows)
      setPagination({...pagination, pageIndex: 0});
    fetchData();
  }, [pagination, globalFilter, sorting]);

  const columns = useMemo<MRT_ColumnDef<RowData>[]>(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'ID',
      //   size: 50,
      // },
      {
        accessorKey: 'title',
        header: 'Tiêu đề',
        size: 300,
      },
      {
        accessorKey: 'time',
        header: 'Thời gian',
        size: 130,
      },
      {
        accessorKey: 'author',
        header: 'Người gửi',
        size: 130,
      },
      {
        accessorKey: 'lastResponse',
        header: 'Phản hồi cuối',
        size: 10,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 50,
        Cell: ({cell}) => (
          <Badge variant={"light"} color={cell.getValue<string>() === "Waiting" ? "yellow" :
            cell.getValue<string>() === "Closed" ? "gray" : ""}>
            {/*{cell.getValue<string>()}*/}
            Đang mở
          </Badge>
        )
      },
    ], []
  );

  return (
    <Container fluid>
      <PageTitle title={"Danh sách yêu cầu hỗ trợ"}></PageTitle>
      <MantineReactTable
        columns={columns}
        data={tableData}

        enableFilterMatchHighlighting={false}
        enableFullScreenToggle={false}

        manualSorting
        onSortingChange={setSorting}

        manualFiltering
        onGlobalFilterChange={setGlobalFilter}
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

        state={{pagination, globalFilter, sorting}}

        renderRowActions={({row, table}) => (
            <ActionIcon color={"cyan"}
                        onClick={() => navigate(row.original.id)}>
              <IconArrowUpRight
                size="2rem"/>
            </ActionIcon>
        )}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Hành động'
          },
        }}

        enableRowActions = {true}
        positionActionsColumn="last"
      />
    </Container>
  );
}

export default InquiryList;
