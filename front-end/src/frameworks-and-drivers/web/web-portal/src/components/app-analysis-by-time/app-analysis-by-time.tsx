import {useEffect, useState} from "react";
import {Grid, Paper, useMantineTheme} from "@mantine/core";
import BarChart from "../bar-chart/bar-chart";

const AppAnalysisByTime = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[3];
  const secondColor = theme.colors.orange[3];

  useEffect(() => {
      setLabels([
        'Thành phố Thủ Đức',
        'Quận 1',
        'Quận 3',
        'Quận 4',
        'Quận 5',
        'Quận 6',
        'Quận 7',
        'Quận 8',
        'Quận 10',
        'Quận 11',
        'Quận 12',
        'Bình Tân',
        'Bình Thạnh',
        'Gò Vấp',
        'Phú Nhuận',
        'Tân Bình',
        'Tân Phú',
        'Bình Chánh',
        'Cần Giờ',
        'Củ Chi',
        'Hóc Môn',
        'Nhà Bè',
      ]);
    }
    , []);

  return (
    <Grid w={"100%"}>
      <Grid.Col span={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Người dùng ứng dụng"}
            labels={labels}
            datasets={[
              {
                label: 'Số người dùng mới',
                data: [3, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 3, 0],
                backgroundColor: secondColor,
              },
              {
                label: 'Số người dùng',
                data: [5, 5, 0, 10, 0, 5, 3, 3, 2, 2, 0, 0, 4, 4, 2, 1, 1, 1, 2, 1, 3, 1],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Trung bình phản hồi"}
            labels={labels}
            datasets={[
              {
                label: 'Trung bình phản hồi',
                data: [0.83, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1.67, 0],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Số lượt truy cập"}
            labels={labels}
            datasets={[
              {
                label: 'Số lượt truy cập',
                data: [26, 0, 0, 8, 0, 0, 0, 0, 12, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 33, 0],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Yêu cầu hỗ trợ"}
            labels={labels}
            datasets={[
              {
                label: 'Số yêu cầu đang xử lý',
                data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                backgroundColor: secondColor,
              },
              {
                label: 'Số yêu cầu',
                data: [5, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Số vị trí theo dõi"}
            labels={labels}
            datasets={[
              {
                label: 'Số vị trí theo dõi đã được đăng ký',
                data: [9, 0, 0, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 11, 0],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default AppAnalysisByTime;
