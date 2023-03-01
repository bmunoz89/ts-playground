// https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype

type MethodsDescriptor<M, MR> = {
  [Key in keyof M]: M[Key] extends (...args: any[]) => MR ? M[Key] : never;
};

type ObjectDescriptor<D, M, MR, MD = MethodsDescriptor<M, MR>> = {
  data?: D;
  methods?: MD & ThisType<D & MD>;
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M, MR>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

const obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    },
  },
});

/** Methods allowed return types. */
type MR = boolean | string | void;

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

console.log("obj.x :>> ", obj.x);
console.log("obj.y :>> ", obj.y);
