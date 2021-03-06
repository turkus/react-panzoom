import produceBounding from './produceBounding';

test('helpers/produceBounding horizontal', () => {
  const boundary = { left: -200, right: 300 };
  const parent = { width: 400, height: 600 };

  expect(produceBounding({
    boundary,
    x: 400,
    y: 20,
    parent,
    rect: { width: 100, height: 100 },
  })).toStrictEqual({ x: 200, y: 20 });

  expect(produceBounding({
    boundary,
    x: 200,
    y: 60,
    parent,
    rect: { width: 200, height: 100 },
  })).toStrictEqual({ x: 100, y: 60 });

  expect(produceBounding({
    boundary,
    x: -150,
    y: 40,
    parent,
    rect: { width: 100, height: 150 },
  })).toStrictEqual({ x: -150, y: 40 });

  expect(produceBounding({
    boundary,
    x: -300,
    y: 30,
    parent,
    rect: { width: 50, height: 60 },
  })).toStrictEqual({ x: -200, y: 30 });

  expect(produceBounding({
    boundary,
    x: 700,
    y: 20,
    parent,
    rect: { width: 150, height: 60 },
  })).toStrictEqual({ x: 150, y: 20 });

  expect(produceBounding({
    boundary,
    x: -200,
    y: 20,
    parent,
    rect: { width: 50, height: 20 },
  })).toStrictEqual({ x: -200, y: 20 });
});

test('helpers/produceBounding vertical', () => {
  const boundary = { top: -200, bottom: 300 };
  const parent = { width: 500, height: 450 };

  expect(produceBounding({
    boundary,
    x: 400,
    y: 140,
    parent,
    rect: { width: 80, height: 160 },
  })).toStrictEqual({ x: 400, y: 140 });

  expect(produceBounding({
    boundary,
    x: 200,
    y: 600,
    parent,
    rect: { width: 550, height: 160 },
  })).toStrictEqual({ x: 200, y: 140 });

  expect(produceBounding({
    boundary,
    x: -150,
    y: -400,
    parent,
    rect: { width: 50, height: 660 },
  })).toStrictEqual({ x: -150, y: -400 });

  expect(produceBounding({
    boundary,
    x: -300,
    y: 300,
    parent,
    rect: { width: 450, height: 100 },
  })).toStrictEqual({ x: -300, y: 200 });

  expect(produceBounding({
    boundary,
    x: 700,
    y: 500,
    parent,
    rect: { width: 80, height: 60 },
  })).toStrictEqual({ x: 700, y: 240 });

  expect(produceBounding({
    boundary,
    x: -200,
    y: -400,
    parent,
    rect: { width: 150, height: 40 },
  })).toStrictEqual({ x: -200, y: -200 });
});

test('helpers/produceBounding vertical + horizontal', () => {
  const boundary = {
    left: 200,
    right: 400,
    top: -100,
    bottom: 300,
  };

  const parent = {
    width: 600,
    height: 500,
  };

  expect(produceBounding({
    boundary,
    x: 400,
    y: 200,
    parent,
    rect: { width: 90, height: 90 },
  })).toStrictEqual({ x: 310, y: 200 });

  expect(produceBounding({
    boundary,
    x: 200,
    y: 600,
    parent,
    rect: { width: 250, height: 60 },
  })).toStrictEqual({ x: 150, y: 240 });

  expect(produceBounding({
    boundary,
    x: -150,
    y: -400,
    parent,
    rect: { width: 80, height: 40 },
  })).toStrictEqual({ x: 200, y: -100 });

  expect(produceBounding({
    boundary,
    x: -300,
    y: 300,
    parent,
    rect: { width: 180, height: 40 },
  })).toStrictEqual({ x: 200, y: 260 });

  expect(produceBounding({
    boundary,
    x: 700,
    y: 500,
    parent,
    rect: { width: 80, height: 140 },
  })).toStrictEqual({ x: 320, y: 160 });

  expect(produceBounding({
    boundary,
    x: -200,
    y: -400,
    parent,
    rect: { width: 40, height: 100 },
  })).toStrictEqual({ x: 200, y: -100 });
});

test('helpers/produceBounding vertical + horizontal zero value', () => {
  const boundary = {
    left: 0,
    top: 0,
  };

  const parent = {
    width: 300,
    height: 400,
  };

  expect(produceBounding({
    boundary,
    x: -200,
    y: -400,
    parent,
    rect: { width: 100, height: 150 },
  })).toStrictEqual({ x: 0, y: 0 });
});
