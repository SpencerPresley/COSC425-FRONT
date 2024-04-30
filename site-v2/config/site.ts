export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Rommel Center Initiative",
	description: "AI Powered Research Database",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			"label": "Home",
			"href": "/"
		},
		{
			label: "Categories A-Z",
			href: "/categories",
		},
		{
			"label": "Docs",
			"href": "/docs"
		},
		{
			"label": "About",
			"href": "/about"
		}
		// {
		// 	label: "Profile",
		// 	href: "/profile",
		// },
		// {
		// 	label: "Dashboard",
		// 	href: "/dashboard",
		// },
		// {
		// 	label: "Projects",
		// 	href: "/projects",
		// },
		// {
		// 	label: "Team",
		// 	href: "/team",
		// },
		// {
		// 	label: "Calendar",
		// 	href: "/calendar",
		// },
		// {
		// 	label: "Settings",
		// 	href: "/settings",
		// },
		// {
		// 	label: "Help & Feedback",
		// 	href: "/help-feedback",
		// },
		// {
		// 	label: "Logout",
		// 	href: "/logout",
		// },

	],
	links: {
		github: "https://github.com/SpencerPresley/COSC425-MAIN",
		// twitter: "https://twitter.com/getnextui",
		// docs: "https://nextui.org",
		// discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://www.salisbury.edu/faculty-and-staff/mdjensen"
	},
};
