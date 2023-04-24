import { withAuth } from "@/utils/withAuth";
import React from "react";
import Layout from "../layout-components/Layout";

const Dashboard = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default withAuth()(Dashboard);
