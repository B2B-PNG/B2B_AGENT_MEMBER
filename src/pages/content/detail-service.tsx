import DetailService from "@/sections/content/service/components/detail-service";
import { CONFIG } from "../../config-global";

const metadata = { title: `Agent member - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <div>
                <title>{metadata.title}</title>
            </div>
            <DetailService />
        </>
    );
}