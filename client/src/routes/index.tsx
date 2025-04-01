import { AdminRoutes } from "./AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { ErrorRoutes } from "./ErrorRouter";
import { HomeRoutes } from "./HomeRoutes";

export const ThemeRoutes = [AuthRoutes, HomeRoutes, ErrorRoutes, DashboardRoutes, AdminRoutes];