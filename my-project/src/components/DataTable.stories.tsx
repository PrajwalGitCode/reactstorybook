import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";
import type { Column, DataTableProps } from "./DataTable";

type User = { id: number; name: string; age: number; role: string };

const sampleData: User[] = [
  { id: 1, name: "Aarav Singh", age: 24, role: "Developer" },
  { id: 2, name: "Meera Iyer", age: 29, role: "Designer" },
  { id: 3, name: "Rohit Gupta", age: 22, role: "Intern" },
  { id: 4, name: "Sara Khan", age: 31, role: "Manager" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
];

const meta: Meta<DataTableProps<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  args: {
    data: sampleData,
    columns,
  },
};
export default meta;

type Story = StoryObj<DataTableProps<User>>;

export const Basic: Story = {};

export const Sortable: Story = {
  args: {
    initialSort: { key: "age", direction: "asc" },
  },
};

export const SelectableMultiple: Story = {
  args: {
    selectable: true,
    selectionMode: "multiple",
  },
};

export const SelectableSingle: Story = {
  args: {
    selectable: true,
    selectionMode: "single",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
  },
};

export const CustomCell: Story = {
  args: {
    columns: [
      { key: "name", title: "Name", dataIndex: "name", sortable: true },
      { key: "age", title: "Age", dataIndex: "age", sortable: true },
      {
        key: "role",
        title: "Role (Badge)",
        dataIndex: "role",
        render: (value) => (
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
            {String(value)}
          </span>
        ),
      },
    ],
  },
};
