import { Avatar, Tooltip } from "@nextui-org/react";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useLayoutContext } from "@/contexts/layout-context";
import { Sidebar } from "./sidebar.styles";
import { useLocation } from "react-router-dom";

export const SidebarWrapper = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isSidebarOpen, setSidebarOpen } = useLayoutContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {!isSidebarOpen ? (
        <div className={Sidebar.Overlay()} onClick={() => setSidebarOpen(false)} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: !isSidebarOpen,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              // icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                // isActive={pathname === "/accounts"}
                title="Accounts"
                // icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                // isActive={pathname === "/payments"}
                title="Payments"
                // icon={<PaymentsIcon />}
              />
            </SidebarMenu>
            <SidebarMenu title="Updates">
              <SidebarItem
                // isActive={pathname === "/changelog"}
                title="Changelog"
                // icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                {/* <SettingsIcon /> */}
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
