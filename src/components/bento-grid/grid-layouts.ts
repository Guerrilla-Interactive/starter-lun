type GridItemStyle = {
  gridRowStart: string
  gridRowEnd: string
  gridColumnStart: string
  gridColumnEnd: string
}

type GridLayout = {
  id: string
  styleMap: Record<number, GridItemStyle>
}

const gridLayouts: GridLayout[] = [
  {
    id: "layout1",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 2",
      },
      3: {
        gridRowStart: "1",
        gridRowEnd: "span 4",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 2",
      },
      5: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "3",
        gridColumnEnd: "span 4",
      },
    },
  },
  {
    id: "layout2",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 2",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "3",
        gridColumnEnd: "span 4",
      },
      3: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 6",
      },
      5: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
    },
  },
  {
    id: "layout3",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 2",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "3",
        gridColumnEnd: "span 2",
      },
      3: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      5: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
    },
  },
  {
    id: "layout4",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 6",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
      3: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 2",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "3",
        gridColumnEnd: "span 4",
      },
      5: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
    },
  },
  {
    id: "layout5",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 2",
      },
      3: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      5: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
    },
  },
  {
    id: "layout6",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 3",
        gridColumnStart: "1",
        gridColumnEnd: "span 2",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 1",
        gridColumnStart: "3",
        gridColumnEnd: "span 6",
      },
      3: {
        gridRowStart: "2",
        gridRowEnd: "span 2",
        gridColumnStart: "3",
        gridColumnEnd: "span 4",
      },
      4: {
        gridRowStart: "2",
        gridRowEnd: "span 2",
        gridColumnStart: "7",
        gridColumnEnd: "span 2",
      },
      5: {
        gridRowStart: "4",
        gridRowEnd: "span 1",
        gridColumnStart: "1",
        gridColumnEnd: "span 8",
      },
    },
  },
  {
    id: "layout7",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 1",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
      3: {
        gridRowStart: "2",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 1",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      5: {
        gridRowStart: "4",
        gridRowEnd: "span 1",
        gridColumnStart: "1",
        gridColumnEnd: "span 8",
      },
    },
  },
  {
    id: "layout8",
    styleMap: {
      1: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      2: {
        gridRowStart: "1",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
      3: {
        gridRowStart: "3",
        gridRowEnd: "span 1",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
      4: {
        gridRowStart: "3",
        gridRowEnd: "span 2",
        gridColumnStart: "5",
        gridColumnEnd: "span 4",
      },
      5: {
        gridRowStart: "4",
        gridRowEnd: "span 1",
        gridColumnStart: "1",
        gridColumnEnd: "span 4",
      },
    },
  },
]

export default gridLayouts
