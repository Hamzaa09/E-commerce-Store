import SideBarComponent from "../SideBarComponent";
import AdminNav from "../AdminNav";
import PageChunk from "./PageChunk";

const Page = (props) => {
  return (
    <div className="flex w-full">
      <div className="flex">
        <SideBarComponent value={props.value.pageName} />
      </div>

      <div className="flex flex-col w-full bg-WhiteLight overflow-auto">
        <AdminNav />

        <div className="p-5">
          <PageChunk value={props.value} />
        </div>
      </div>
    </div>
  );
};

export default Page;
