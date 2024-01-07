"use client"

import React, { useState, FC } from "react"
import {
  useGlobalContext,
} from "@/src/context/global-context"
import {
  Fixed,
  Flex,
  FlexCol,
  FlexRow,
} from "../../components/nextgen-core-ui"
import TogglePanel from "./utilities/toggle-panel.component"
import { cn } from "@/src/utils/cn.util"

type Tab =
  | "generalData"
  | "siteData"
  | "screenData"
  | "headerData"
  | "pageData"
  | "shoppingCartData"

type DataCellProps = {
  data: any
  level?: number
}

const DataCell: FC<DataCellProps> = ({ data, level = 0 }) => {
  const stringifyObject = (obj: any, depth = 0, indent = 0): string => {
    if (depth > 3 || obj === null || typeof obj !== 'object') {
      return JSON.stringify(obj);
    }

    const indentString = ' '.repeat(indent);
    const entries: string[] = Object.entries(obj).map(([key, value]) => {
      const stringValue: string = typeof value === 'object'
        ? stringifyObject(value, depth + 1, indent + 2)
        : JSON.stringify(value);
      return `\n${indentString}${key}: ${stringValue}`;
    });

    return `{${entries.join(', ')}\n${indentString}}`;
  };
  // Check if data is an array
  if (Array.isArray(data)) {
    return (
      <div style={{ paddingLeft: level * 2 }}>
        {data.map((item, index) => (
          <div key={index} style={{ paddingLeft: level * 10 }}>
            <pre>{stringifyObject(item, 0, level * 2 + 2)}</pre>
          </div>
        ))}
      </div>
    );
  }

  // Handle single object data
  if (typeof data === 'object') {
    return (
      <pre style={{ paddingLeft: level * 10 }}>
        {stringifyObject(data, 0, level * 2 + 2)}
      </pre>
    );
  }

  // For non-object, non-array data
  return <span>{data != null ? data.toString() : 'null'}</span>;
};

const DataRow: FC<{ data: Record<string, any> }> = ({ data }) => (
  <>
    {Object.keys(data).map((key) => (
      <FlexRow
        className="justify-between max-h-[300px] scrollbar-hide overflow-y-scroll overflow-x-scroll gap-x-2 border-b border-b-gray-400 border-opacity-20 py-4 "
        key={key}
      >
        <FlexRow className="gap-x-4">
          <FlexCol>{key}:</FlexCol>
        </FlexRow>
        <FlexRow className="min-w-[12rem] gap-x-2">
          <FlexCol>
            <DataCell data={data[key]} />
          </FlexCol>
          {typeof data[key] === "boolean" ? (
            <StatusCircle status={data[key]} />
          ) : null}
        </FlexRow>
      </FlexRow>
    ))}
  </>
)

export const NextgenContextStatusPanel: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("generalData")
  const { globalData } = useGlobalContext()

  if (process.env.NODE_ENV === "production") return null
  const renderContent = {
    generalData: (
      <>
        <DataRow data={{ pathname: globalData.pageData.pathname }} />
        <DataRow
          data={{
            screenWidth: globalData.screenData.screenWidth,
            screenHeight: globalData.screenData.screenHeight,
          }}
        />
        <DataRow data={{ expanded: globalData.headerData.expanded }} />
        <DataRow data={{ peek: globalData.headerData.peek }} />
        <DataRow
          data={{ verticalSpaceActivated: globalData.verticalSpaceActivated }}
        />

        <DataRow data={{ aboveTheFold: globalData.headerData.aboveTheFold }} />
        <DataRow data={{ topOfPage: globalData.headerData.topOfPage }} />
        <DataRow
          data={{ halfwayOrMore: globalData.headerData.halfwayOrMore }}
        />
      </>
    ),
    pageData: <DataRow data={globalData.pageData} />,
    siteData: <DataRow data={globalData.siteData} />,
    screenData: <DataRow data={globalData.screenData} />,
    headerData: <DataRow data={globalData.headerData} />,
    shoppingCartData: <DataRow data={globalData.shoppingCartData} />,
  }

  return (
    <Fixed bottom right className="bottom-12 right-12  !z-[999]">
      <TogglePanel title="Nextgen Context">
        <FlexCol className=" min-h-[37.5rem] w-[22.5rem] rounded-lg border-2 border-[#ffffff55] bg-white bg-opacity-50 font-sans text-xs font-light  backdrop-blur-lg ">
          <Flex className="gap-6 overflow-x-scroll border-b-[1px] border-gray-400  border-opacity-20  bg-opacity-20  py-6 scrollbar-hide  ">
            {[
              "generalData",
              "siteData",
              "pageData",
              "headerData",
              "screenData",
              "shoppingCartData",
            ].map((tab) => (
              <button
                key={tab}
                className={cn(
                  activeTab === tab ? "active-tab font-bold" : "",
                  " whitespace-nowrap opacity-80 first:ml-6 last:mr-6"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </Flex>
          <div className="px-6 pt-5">{renderContent[activeTab as Tab]}</div>
        </FlexCol>
      </TogglePanel>
    </Fixed>
  )
}

type StatusCircleProps = {
  status: boolean
}

const StatusCircle: FC<StatusCircleProps> = ({ status }) => {
  const circleClass = status ? "bg-green-500" : "bg-red-500"

  return <div className={`!z-[9909] h-4 w-4 rounded-full ${circleClass}`} />
}
