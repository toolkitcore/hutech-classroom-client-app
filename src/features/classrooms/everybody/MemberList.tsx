import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Profile from "../../../app/common/models/Profile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { store, useStore } from "../../../app/stores/store";
import { PaginationParams } from "../../../app/common/models/paginationPrams";
import { observer } from "mobx-react-lite";

const members: Profile[] = [
  {
    id: "m1",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m2",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m3",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m4",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m5",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m6",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m7",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m8",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m9",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m10",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m11",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m12",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
  {
    id: "m13",
    userName: "2080600803",
    email: "truongthucvan@gmail.com",
    firstName: "Truong Thuc",
    lastName: "Van",
  },
  {
    id: "m14",
    userName: "2080600914",
    email: "nguyehongthai@gmail.com",
    firstName: "Nguyen Hong",
    lastName: "Thai",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "role", headerName: "Thông Tin", width: 200 },
  { field: "username", headerName: "Tài Khoản", width: 200 },
  { field: "fullName", headerName: "Họ Tên", width: 300 },
  { field: "email", headerName: "Email", width: 400 },
];

const rows = members.map((m, i) => {
  return {
    id: m.id,
    role: "Sinh Viên",
    username: m.userName,
    fullName: `${m.firstName} ${m.lastName}`,
    email: m.email,
  };
});

const MemberList = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const { classroomStore } = useStore();
  const [rows, setRows] = useState<GridRowsProp>([]);
  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        classroomStore
          .loadClassroomUsers(new PaginationParams(1, 100, ""))
          .then((list) => {
            console.group(list);
            if (list)
              setRows(
                list.map((m, i) => {
                  return {
                    id: i,
                    role: "Sinh Viên",
                    username: m.userName,
                    fullName: `${m.firstName} ${m.lastName}`,
                    email: m.email,
                  };
                })
              );
          });
      });
  }, []);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 4,
          border: "solid 2px #f5f5f5",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
            fontWeight: "bold",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 100]}
      />
    </div>
  );
};

export default observer(MemberList);
