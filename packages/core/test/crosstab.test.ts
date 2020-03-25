import crosstab from '../src/crosstab';

describe('crosstab', () => {
  it('sends and recieves messages', () => {
    expect.assertions(1);

    const inData = { foo: 'bar' };

    crosstab.on('foobar', (outData1) => {
      expect(outData1).toBe(inData);
    });

    crosstab.emit('foobar', inData);
  });

  it('supports multiple listeners', () => {
    expect.assertions(2);

    crosstab.on('foo', (out1) => {
      expect(out1).toBe('bar');
    });

    crosstab.on('foo', (out2) => {
      expect(out2).toBe('bar');
    });

    crosstab.emit('foo', 'bar');
  });

  it('supports generic off', () => {
    let count = 0;
    const handler = () => {
      count += 1;
    };

    crosstab.on('generic-off', handler);
    crosstab.on('generic-off', handler);
    crosstab.on('generic-off', handler);
    crosstab.on('still-on', handler);

    crosstab.off('generic-off');

    crosstab.emit('generic-off');
    crosstab.emit('still-on');

    expect(count).toBe(1);
  });

  it('supports function-specific off', () => {
    let count = 0;
    const handler = () => {
      count += 1;
    };

    crosstab.on('function-specific', handler);
    crosstab.on('function-specific', () => {
      count += 3;
    });

    crosstab.off('function-specific', handler);

    crosstab.emit('function-specific');

    expect(count).toBe(3);
  });

  it('works when no listeners are attached', () => {
    expect(() => {
      crosstab.off('nothing-attached', () => {});
      crosstab.off('nothing-attached', () => {});
    }).not.toThrow();
  });

  /*
   * NOTE: The node mock of BroadcastChannel emits in ourself,
   * so that we can test easily. Because of that, we expect a double-emit,
   * as that means it hit the normal emit, then the self-emit.
   */
  it('supports selfEmit', () => {
    expect.assertions(2);

    crosstab.on('selfEmit', (out) => {
      expect(out).toBe('yep');
    });

    crosstab.emit('selfEmit', 'yep', true);
  });
});
