export function restrictToHorizontalAxisAndBottom(args) {
    const {transform} = args;

    return {
        ...transform,
        y: transform.y >= 0 ? transform.y : 0
    };
}
