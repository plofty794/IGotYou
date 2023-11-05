import AdminDropdownMenu from "./AdminDropdownMenu";

function Navigation() {
  return (
    <nav className="py-4 px-8 flex justify-between items-center border-b">
      <div className="flex justify-between items-center gap-4">
        <ul className="font-medium text-sm flex items-center justify-center gap-4">
          <li>Overview</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </div>
      <AdminDropdownMenu />
    </nav>
  );
}

export default Navigation;
