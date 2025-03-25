import DesignSystemDocs from "../components/DesignSystem";
import DragDrop from "../components/DragDrop";
import FormBuilder from "../components/formBuilder";
import GridLayout from "../components/Gridlayout";
import InteractiveResume from "../components/InteractiveResume";
import LiveComponentPlayground from "../components/LiveComponentPlayground";
import PerformanceDashboard from "../components/PerformanceDashboard";

export default function TestComp(){

    return <>
    <DragDrop/>
    <DesignSystemDocs/>
    <FormBuilder/>
    <GridLayout/>
    <InteractiveResume/>
    <LiveComponentPlayground/>
    <PerformanceDashboard/>
    {/* <SkillGraph/> */}
    </>

}