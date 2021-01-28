export default interface ChildrenProp<T> {
    children: (parent: T) => Children;
}
