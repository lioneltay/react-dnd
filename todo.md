## Todo

- [ ] shopping basket example (buyyer send data back to item, items know who bought them)

- [ ] once an item is dragging no other dragging should be able to start
  - [ ] got to find a better way to manage state updates
  - [ ] think about updateData as well

- [ ] dropzone should consume drop unless specified not too

- [ ] ability to compose custom event handlers (don't just override them)

- [ ] should be able to register a renderer at useDraggable()

- [ ] Clicked on item in nav drawer should close drawer

- [ ] Review media component (turn it into hook)

- [ ] Review drawer component

- [ ] AND types, current types behave like OR

- [ ] Performance (review, also just see whether examples perform well)

  - [ ] should component update equivalent for hooks or else a pattern
    - [ ] want to avoid having to define the jsx is it is not needed (so probably cant use a hook)
    - [ ] you can return the same jsx with referential equality and react will avoid re rendering

- Examples

  - [ ] Drag and drop reorderable list
  - [ ] kanban board

- [ ] write tests on main package
- [ ] write tests for examples

- [ ] Scaffold documentation site
- [ ] Write usage documentation

- [ ] Put examples on code sandbox

  - [ ] tweet with @codesandbox to get viewed and maybe chosen

- [ ] Introductory Blog Post
  - [ ] Twitter link

* [ ] have a look at https://github.com/mzabriskie/react-draggable
