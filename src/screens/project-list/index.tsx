import React from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils/index";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProject(useDebounce(param, 200));
  const { data: users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
      {error && <Typography.Text type={"danger"}>{error.message}</Typography.Text>}
      <List users={users || []} dataSource={list || []} loading={isLoading}></List>
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
