import {ActionIcon, Badge, Container, Text} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useEffect, useMemo, useState} from "react";
import {MantineReactTable, MRT_ColumnDef, MRT_SortingState} from "mantine-react-table";
import {Query} from "@front-end/shared/utils";
import {IconArrowUpRight} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {CommentEntity, Status} from "@front-end/domain/entities/inquiry";
import {InquiryApi} from "@front-end/frameworks-and-drivers/app-sync/inquiry";
import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {InquiryInteractors} from "@front-end/application/interactors/inquiry";
import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryControllers} from "@front-end/interface-adapters/controllers/inquiry";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";

const InquiryList = () => {
  const [totalRows, setTotalRows] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [tableData, setTableData] = useState<InquiryViewModel[]>([]);

  const navigate = useNavigate();

  const inquiryRepository: InquiryRepository = new InquiryApi();
  const inquiryUseCase: InquiryUsecases = new InquiryInteractors(inquiryRepository);
  const inquiryController: InquiryControllers = new InquiryControllers(inquiryUseCase);

  const fetchInquiryList = async () => {
    const inquiryList = await inquiryController.getInquiries();
    setTableData(inquiryList.inquiries);
    setTotalRows(inquiryList.total);
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
      sortBy: sort,
      orderBy: order,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }
    //TODO: call api
    fetchInquiryList()
  };

  useEffect(() => {
    if (pagination.pageIndex * pagination.pageSize > totalRows)
      setPagination({...pagination, pageIndex: 0});
    fetchData();
  }, [pagination, globalFilter, sorting]);

  const isAdminLast = (comments: CommentEntity[]) => {
    if (comments.length === 0) return false;
    return comments[comments.length - 1].isAdmin;
  }

  const renderStatusBage = (status: Status) => {
    return (
      <Badge variant={"light"} color={status === Status.WAITING ? "yellow" :
        status === Status.CLOSED ? "gray" : ""}>
        {status === Status.WAITING ? "Chờ duyệt" :
          status === Status.CLOSED ? "Đã đóng" : "Đang mở"}
      </Badge>
    )
  }

  const columns = useMemo<MRT_ColumnDef<InquiryViewModel>[]>(
    () => [
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
        accessorKey: 'comments',
        header: 'Phản hồi cuối',
        size: 10,
        Cell: ({cell}) => (
          <Text>{isAdminLast(cell.getValue<CommentEntity[]>() ?? []) ? "Admin" : "Người dùng"}</Text>
        )
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 50,
        Cell: ({cell}) => (
          renderStatusBage(cell.getValue<Status>())
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

        enableRowActions={true}
        positionActionsColumn="last"
      />
    </Container>
  );
}

export default InquiryList;
