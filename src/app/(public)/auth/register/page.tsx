import useRole, { RoleProvider } from "@/hooks/RoleContext";
import { RoleButtons } from "../components/RoleButtons";
import { RegForms } from "../components/RegForms";


export default function RegPage() {

    return (
        <RoleProvider>
            <RoleButtons/>
            <RegForms/>
        </RoleProvider>
    )
}
