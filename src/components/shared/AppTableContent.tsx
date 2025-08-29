import {
  PageSlider,
  TableContent,
  TableFooter,
  TableHeader,
} from "@components/custom";
import { TableContentSkeleton } from "@components/skeleton";
import type { AppContentType, FetchDataType } from "@interfaces/pageInterface";
import type { SlideStateType } from "@interfaces/stateInterface";

type Props = {
  contentData: AppContentType;
  fetchData: FetchDataType;
  isLoading: boolean;
  pageData?: SlideStateType;
  tabData?: string[];
};

const AppTableContent = ({
  contentData,
  fetchData,
  isLoading,
  pageData,
  tabData,
}: Props) => {
  return (
    <div className="grow basis-0 bg-neutral-0 border border-neutral-200 rounded-lg overflow-y-auto">
      <div className="p-md gap-[6px]">
        <h1 className="text-neutral-900">{contentData.title}</h1>

        <p className="text-body-sm font-normal text-neutral-500">
          {contentData.subTitle}
        </p>
      </div>

      {tabData && <PageSlider sliderData={tabData} pageData={pageData!} />}

      <div className="flex-1 px-xs lg:px-md lg:pb-xs">
        <div className="flex-1 lg:border border-neutral-200 lg:rounded-lg overflow-x-auto">
          <TableHeader headerData={contentData.tableHeader} />

          {isLoading ? (
            <TableContentSkeleton />
          ) : (
            <TableContent contentData={fetchData.finalData} />
          )}
        </div>
      </div>

      {!isLoading && <TableFooter footerData={fetchData.pagination} />}
    </div>
  );
};

export default AppTableContent;
