import { Box } from "@material-ui/core";
import Header from "../common/header";

export default function Layout(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      {props.children}
    </Box>
  );
}
