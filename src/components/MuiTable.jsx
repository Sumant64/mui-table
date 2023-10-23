import {
  Box,
  CircularProgress,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import data from "../service/userdata.json";

const MuiTable = () => {
  const [userData, setUserData] = useState();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    // setRowsData(data);
    pagination(data);
    setLoading(false);
  }, [page, rowsPerPage]);

  const pagination = (res) => {
    const mydata = res;
    console.log(mydata.length);
    setCount(mydata.length);
    const firstIndex = (page - 1) * rowsPerPage;
    const lastIndex = rowsPerPage + firstIndex;
    const newData = data.slice(firstIndex, lastIndex);
    setRowsData(newData);
  };

  const setRowsData = (res) => {
    const rowsData = res.map((r) => {
      const rowData = {
        id: r.id,
        firstName: r.first_name,
        lastName: r.last_name,
        email: r.email,
        gender: r.gender,
        university: r.university,
        city: r.city,
        country: r.country,
      };
      return rowData;
    });
    setRows(rowsData);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {
        !loading ? (
        <Box>
          <Typography variant="h2" sx={{textAlign: 'center'}}>MUI Table</Typography>
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>University</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.university}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.country}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            sx={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
            }}
            component={Paper}
            elevation={2}
            count={count}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            onPageChange={(event, newPage) => setPage(newPage + 1)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default MuiTable;
