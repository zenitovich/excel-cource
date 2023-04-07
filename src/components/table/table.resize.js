import $ from '../../core/dom';

export default function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    // closest ищет ближайшего родителя по параметрам
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: `${-delta}px`,
        });
      } else if (type === 'row') {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: `${-delta}px`,
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({
          width: `${value}px`,
        });
        // eslint-disable-next-line no-return-assign, no-param-reassign
        cells.forEach((el) => el.style.width = `${value}px`);
      } else {
        $parent.css({
          height: `${value}px`,
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
