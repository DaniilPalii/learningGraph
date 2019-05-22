export module Sizes {
  export const node: number = 50;
  export const nodeClickDelta: number = 7;
  export const nodeClicked: number = node + nodeClickDelta;
  export const nodeBorder: number = 2;
  export const nodesYInterval: number = 20;
  export const nodesCYInterval: number = nodesYInterval + node;

  export const branch: number = nodeBorder;
  export const branchClickDelta: number = 3;
  export const branchClicked: number = branch + branchClickDelta;
}
