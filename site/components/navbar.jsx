"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";

export const CustomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Topic A-Z", href: "/" },
    { label: "Test 2", href: "/test2" },
    { label: "Need to make log out red", href: "/" },
    { label: "Log Out", href: "/" },
  ];

  return (
    <Navbar className="bg-slate-150" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Topic A-Z
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/test2" aria-current="page">
            test2
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/">Topic A-z</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/test2" variant="flat">
            Test 2
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
  {menuItems.map((item, index) => (
    <NavbarMenuItem key={`${item.label}-${index}`}>
      <Link
        color={
          index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
        }
        className="w-full"
        href={item.href}
        size="lg"
      >
        {item.label}
      </Link>
    </NavbarMenuItem>
  ))}
</NavbarMenu>
    </Navbar>
  );
}

