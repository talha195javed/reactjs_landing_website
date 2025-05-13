import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Menu, MenuHandler, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";

export function UserMenu() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Menu>
            <MenuHandler>
                <Button
                    variant="text"
                    className="flex items-center gap-1 py-2 pr-4 pl-3 capitalize"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <Typography className="font-medium">
                            {user.name}
                        </Typography>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </MenuHandler>
            <MenuList>
                <MenuItem className="flex items-center gap-2" onClick={logout}>
                    <PowerIcon className="h-4 w-4" />
                    <Typography variant="small" className="font-medium">
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
