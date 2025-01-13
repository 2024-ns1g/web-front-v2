import { useLayoutContext } from "@/contexts/layout-context";
import React, { useEffect, useState } from "react";

export const SidebarWrapper = () => {
  const { isSidebarOpen, toggleSidebar } = useLayoutContext();

  const { activePage, setActivePage } = useStateContext();

  useEffect(() => {
    const parsed = pageListSchema.safeParse(cachedPages);

    if (
      parsed.success &&
      parsed.data &&
      parsed.data.pages &&
      parsed.data.pages.length > 0) {
      setPages(parsed.data.pages);
    }
  }, [cachedPages]);


  const handleCreatePage = async () => {
    createPage().then(() => {
      updateCacheForce();
    });
  }

  const handleSelectPage = (pageId: string, displayName: string) => {
    setActivePage({
      id: pageId,
      displayName: displayName,
    });
  }

  useEffect(() => {
    updateCacheIfNeeded();
  }, []);


  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="全体">
              {/* ダッシュボードへのリンクとか */}
            </SidebarMenu>
            <SidebarMenu title="アクション">
              <SidebarItem
                title="ページを追加"
                icon={<CustomersIcon />}
                onClick={handleCreatePage}
              />
              <SidebarItem
                title="デバッグ1"
                icon={<CustomersIcon />}
                onClick={() => {
                  console.log(pages);
                }}
              />
              <SidebarItem
                title="デバッグ2"
                icon={<CustomersIcon />}
                onClick={() => {
                  console.log(cachedPages);
                }}
              />
            </SidebarMenu>
            <SidebarMenu title="ページ一覧">
              {
                pages.map((item) => (
                  <SidebarItem
                    key={item.pageId}
                    title={item.title || "無名のページ"}
                    icon={<HomeIcon />}
                    isActive={(activePage && activePage.id === item.pageId) || false}
                    onClick={() => handleSelectPage(item.pageId, item.title || "無名のページ")}
                  />
                ))
              }
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
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
