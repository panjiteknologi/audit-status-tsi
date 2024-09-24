import * as React from "react";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2DragAndDropOverlay } from "@mui/x-tree-view/TreeItem2DragAndDropOverlay";

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "warning.main",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[600],
  position: "relative",
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.8),
  marginTop: theme.spacing(0.8),
  paddingRight: theme.spacing(2),
  padding: 24,
  fontWeight: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: theme.transitions.create(["box-shadow", "background-color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    boxShadow: `0 3px 6px ${alpha(theme.palette.primary.dark, 0.2)}`,
  },
  "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
    backgroundColor: "#16325B",
    color: theme.palette.primary.contrastText,
    boxShadow: `0 3px 6px ${alpha(theme.palette.primary.dark, 0.5)}`,
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
    config: { tension: 210, friction: 20 },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)(({ theme }) => ({
  fontFamily: "Arial",
  fontWeight: 500,
  marginLeft: "0.5rem",
  transition: "color 0.2s",
  textTransform: "capitalize",
  fontSize: 14,
  "&:hover": {},
  "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
    color: theme.palette.primary.contrastText,
  },
}));

interface CustomLabelProps {
  children: React.ReactNode;
  expandable?: boolean;
  itemId: string;
}

function CustomLabel({
  itemId,
  expandable,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        className="labelIcon"
        color="inherit"
        sx={{ mr: 1, fontSize: "1.2rem" }}
      >
        <Typography>{itemId}</Typography>
      </Box>

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem2({ itemId, children, label, disabled, rootRef: ref });

  const expandable = isExpandable(children);

  return (
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": status.selected,
              "Mui-focused": status.focused,
              "Mui-disabled": status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              expandable: expandable && status.expanded,
              itemId,
            })}
          />
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});

type ExtendedTreeItemProps = {
  items: any;
};

const ScopeLibrarySections = ({ items }: ExtendedTreeItemProps) => {
  return (
    <RichTreeView
      items={items}
      defaultExpandedItems={[]}
      defaultSelectedItems={""}
      itemProp={items}
      sx={{
        height: "fit-content",
        flexGrow: 1,
        overflowY: "auto",
      }}
      slots={{ item: CustomTreeItem }}
    />
  );
};

export default ScopeLibrarySections;
