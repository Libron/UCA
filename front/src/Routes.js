import BubbleChart from "@material-ui/icons/BubbleChart";
import Zoom from "./containers/Zoom/Zoom";

const dashboardRoutes = [
    {
        path: "/",
        name: "Zoom Accounts",
        icon: BubbleChart,
        component: Zoom,
    },
    {
        path: "/zoom/:id",
        name: "Zoom",
        icon: BubbleChart,
        component: Zoom,
    }
];

export default dashboardRoutes;
