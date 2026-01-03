import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router";

const SideBar = ({ menuItems, collapsed }) => {
    return (
        <Sidebar
            collapsed={collapsed}
            className="h-screen border-r bg-white shadow-lg"
        >
            {/* Logo / Header */}
            <div className="p-4 text-xl font-semibold text-blue-600 border-b">
                Pro Sidebar
            </div>

            <Menu className="px-2 py-4 space-y-1">
                {menuItems.map((item, i) =>
                    item.children ? (
                        <SubMenu
                            key={i}
                            label={item.label}
                            icon={item.icon}
                            className="text-gray-700"
                        >
                            {item.children.map((child, index) => (
                                <MenuItem
                                    key={index}
                                    component={<NavLink to={child.path} />}
                                    className="pl-8 text-sm hover:bg-blue-50 rounded-lg"
                                >
                                    {child.label}
                                </MenuItem>
                            ))}
                        </SubMenu>
                    ) : (
                        <MenuItem
                            key={i}
                            icon={item.icon}
                            component={<NavLink to={item.path} />}
                            className="rounded-lg text-gray-700 hover:bg-blue-50"
                        >
                            {item.label}
                        </MenuItem>
                    )
                )}
            </Menu>
        </Sidebar>
    );
};

export default SideBar;
