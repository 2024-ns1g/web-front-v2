import { useLayoutContext } from "@/contexts/layout-context";
import { useStateContext } from "@/contexts/state-context";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Tooltip } from "@nextui-org/tooltip";

export const SidebarWrapper = () => {
  const { activePageId, setActivePageId } = useStateContext();

  const { isSidebarOpen, setSidebarOpen } = useLayoutContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {!isSidebarOpen ? (
        <div className={Sidebar.Overlay()} onClick={() => setSidebarOpen(!isSidebarOpen)}></div>
      ) : null}
      <div
        className={Sidebar({
          collapsed: isSidebarOpen,
        })}
      >
        {/* <div className={Sidebar.Header()}> */}
        {/*   <CompaniesDropdown /> */}
        {/* </div> */}
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<p>あ</p>}
              // isActive={pathname === "/"}
              isActive={false}
              href="/"
            />
            <SidebarMenu title="全体">
              {/* ダッシュボードへのリンクとか */}
            </SidebarMenu>
            <SidebarMenu title="アクション">
              <SidebarItem
                title="ページを追加"
                icon={<p>あ</p>}
                // onClick={handleCreatePage}
              />
              <SidebarItem
                title="デバッグ1"
                icon={<p>あ</p>}
                // onClick={() => {
                //   console.log(pages);
                // }}
              />
              <SidebarItem
                title="デバッグ2"
                icon={<p>あ</p>}
                // onClick={() => {
                //   console.log(cachedPages);
                // }}
              />
            </SidebarMenu>
            {/* <SidebarMenu title="ページ一覧"> */}
            {/*   { */}
            {/*     pages.map((item) => ( */}
            {/*       <SidebarItem */}
            {/*         key={item.pageId} */}
            {/*         title={item.title || "無名のページ"} */}
            {/*         icon={<HomeIcon />} */}
            {/*         isActive={(activePage && activePage.id === item.pageId) || false} */}
            {/*         onClick={() => handleSelectPage(item.pageId, item.title || "無名のページ")} */}
            {/*       /> */}
            {/*     )) */}
            {/*   } */}
            {/* </SidebarMenu> */}
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                {/* <SettingsIcon /> */}
                <p>あ</p>
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                {/* <FilterIcon /> */}
                <p>あ</p>
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              {/* <Avatar */}
              {/*   src="https://i.pravatar.cc/150?u=a042581f4e29026704d" */}
              {/*   size="sm" */}
              {/* /> */}
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
