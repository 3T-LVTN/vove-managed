import {
  Center,
  Container,
  Group,
  Table,
  TextInput,
  UnstyledButton,
  Text,
  createStyles,
  rem,
  Paper, ScrollArea, Badge, Pagination
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {IconChevronDown, IconChevronUp, IconSearch, IconSelector} from "@tabler/icons-react";
import React, {ReactNode, useState} from "react";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  id: string;
  title: string;
  time: string;
  author: string;
  lastResponse: "User" | "Admin";
  status: "Waiting" | "Opening" | "Closed";
}

interface ThProps {
  children: ReactNode;
  reversed: boolean;
  sorted: boolean;

  onSort(): void;
}

function Th({children, reversed, sorted, onSort}: ThProps) {
  const {classes} = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5}/>
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data;
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const {sortBy} = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const InquiryList = () => {
  const data: RowData[] = [
    {
      id: "001",
      title: "My app is slow",
      time: "2023-05-01 5:51:00",
      author: "Nguyen Mai Thy",
      lastResponse: "User",
      status: "Closed",
    },
    {
      id: "002",
      title: "Improve disease outbreak tracking",
      time: "2023-05-02 09:15:00",
      author: "Le Tran Hoang Thinh",
      lastResponse: "Admin",
      status: "Closed",
    },
    {
      id: "003",
      title: "Add vaccine availability information",
      time: "2023-05-03 17:20:00",
      author: "Ung Tuong Phat",
      lastResponse: "User",
      status: "Closed",
    },
    {
      id: "004",
      title: "Improve symptom tracking",
      time: "2023-05-04 11:00:00",
      author: "Bui Hai Duong",
      lastResponse: "Admin",
      status: "Closed",
    },
    {
      id: "005",
      title: "Add personalized recommendations",
      time: "2023-05-05 15:30:00",
      author: "Doan Thuy Ha",
      lastResponse: "User",
      status: "Closed",
    },
    {
      id: "006",
      title: "Improve data accuracy",
      time: "2023-05-03 12:27:00",
      author: "Le Tran Hoang Thinh",
      lastResponse: "Admin",
      status: "Closed",
    },
    {
      id: "007",
      title: "Add support for multiple languages",
      time: "2023-05-03 12:35:00",
      author: "Ung Binh Nguyen",
      lastResponse: "User",
      status: "Closed",
    },
    {
      id: "008",
      title: "Improve app accessibility",
      time: "2023-05-03 12:30:00",
      author: "Thoa Ngoc Uyen",
      lastResponse: "Admin",
      status: "Opening",
    },
    {
      id: "009",
      title: "The predict results in my living area is incorrect",
      time: "2023-05-06 19:00:00",
      author: "Nguyen Mai Thy",
      lastResponse: "Admin",
      status: "Opening",
    },
    {
      id: "010",
      title: "Add travel advisories for disease outbreaks",
      time: "2023-05-09 14:45:00",
      author: "Le Tran Hoang Thinh",
      lastResponse: "User",
      status: "Waiting",
    },
  ];

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const navigate = useNavigate();

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, {sortBy: field, reversed, search}));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, {sortBy, reversed: reverseSortDirection, search: value}));
  };

  const rows = data.map((row) => (
    <tr key={row.id} onClick={() => navigate(row.id)} style={{cursor:"pointer"}}>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.time}</td>
      <td>{row.author}</td>
      <td>{row.lastResponse}</td>
      <td>
        <Badge variant={"light"} color={row.status === "Waiting" ? "yellow" :
          row.status === "Closed" ? "gray" : ""}>
          {row.status}
        </Badge>
      </td>
    </tr>
  ));
  return (
    <Container fluid>
      <PageTitle title="Inquiry List"/>
      <Paper withBorder p="md" radius="md">
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5}/>}
          value={search}
          onChange={handleSearchChange}
        />
        <Paper withBorder radius="md" mb="md">
          <ScrollArea>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover>
              <thead>
              <tr>
                <Th
                  sorted={sortBy === 'id'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('id')}
                >
                  Id
                </Th>
                <Th
                  sorted={sortBy === 'title'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('title')}
                >
                  Title
                </Th>
                <Th
                  sorted={sortBy === 'time'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('time')}
                >
                  Last Update
                </Th>
                <Th
                  sorted={sortBy === 'author'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('author')}
                >
                  Author
                </Th>
                <Th
                  sorted={sortBy === 'lastResponse'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('lastResponse')}
                >
                  Last Response
                </Th>
                <Th
                  sorted={sortBy === 'status'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('status')}
                >
                  Status
                </Th>
              </tr>
              </thead>
              <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={Object.keys(data[0]).length}>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
        <Pagination total={2} withEdges position="center" variant="light"/>
      </Paper>
    </Container>
  );
}

export default InquiryList;
