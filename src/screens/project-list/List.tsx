import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { User } from "./SearchPanel";

// react-router和react-router-dom的关系 类似于react 和 react-dom/react-native的关系
// react是一个核心库，主要处理虚拟的，计算的，理论的逻辑（state的状态和useEffect怎么影响dom树，domdiff的计算结果就会给到react-dom消费）
// 为什么react和react-dom不一开始就结合在一起？
// react-dom主要生活在浏览器的宿主环境里，里面充满了dom操作，而dom操作只在浏览器里面运行
// 而react-native在ios，安卓的环境中来消费react的运算结果
// 同理，react-router主要是管理路由状态，Route和Routes就是一个对象，不停地计算此时此刻路由树的状态，计算的结果就会给到react-route-dom消费，或者也可以给nitave环境来消费
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { ColumnsType } from "antd/es/table";
import { useEditProjectPin } from "./util";
// Link会生成一个a标签，这是跟浏览器这个宿主环境有很强的关系，所以在react-router-dom中引入

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProjectPin();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />;
      },
    },
    {
      title: "名称",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={"projects/" + project.id}>{project.name}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "负责人",
      key: "personId",
      render(value, project) {
        return <span>{users.find((user) => user.id === project.id)?.name || "未知"}</span>;
      },
    },
    {
      title: "创建时间",
      key: "created",
      render(value, project) {
        return <span>{project.created ? dayjs(project.created).format("YYYY-MM-DD") : " - "}</span>;
      },
    },
  ];
  return <Table columns={columns} pagination={false} rowKey={"id"} {...props}></Table>;
};
