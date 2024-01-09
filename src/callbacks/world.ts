export function nested(ctx: { getVars: () => { var1: string; var2: string } }) {
  return ({ data }: { data: { val2: number } }) => {
    const vars = ctx.getVars();
    return `${vars.var1} ${vars.var2} ${data.val2}`;
  };
}

export function asyncNested(ctx: {
  asyncGetVars: () => Promise<{ var1: string; var2: string }>;
}) {
  return async ({ data }: { data: { val2: number } }) => {
    const vars = await ctx.asyncGetVars();
    return `${vars.var1} ${vars.var2} ${data.val2}`;
  };
}
