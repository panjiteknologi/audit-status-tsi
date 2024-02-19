import { ForwardRefExoticComponent, RefAttributes } from "react"

export type ColorType = "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
export type SizeType = "small" | "medium" | "large"
export type MediaQueryType = "xs" | "sm" | "md" | "lg" | "xl"
export type VariantType = "contained" | "light" | "shadow" | "outlined" | "dashed" | "text" | "rounded" | "default"
export type LoadingPositionType = "center" | "start" | "end"
export type PositionType = 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom' | 'top-left'
export type PositioningType = 'fixed' | 'static' | 'sticky'
export type TransitionType = 'grow' | 'collapse' | 'fade' | 'slide' | 'zoom'
export type DirectionType = 'up' | 'down' | 'right' | 'left'
export type TypeType = 'circular' | 'rounded' | 'square' | string
export type ListItemProps = { component: ForwardRefExoticComponent<Omit<any, "ref"> & RefAttributes<unknown>> | string, href?: any, target?: string; }