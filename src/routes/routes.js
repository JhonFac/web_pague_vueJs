import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import UserProfile from "@/pages/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/user",
    children: [
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
    ],
  },
];

export default routes;
