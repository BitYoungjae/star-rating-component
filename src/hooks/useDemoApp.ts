import { useState, useRef, useEffect, ChangeEvent } from 'react';

const numberRegex = /^[0-9]*$/;

export const useDemoApp = () => {
  const [formData, setFormData] = useState({
    now: '45',
    max: '100',
    starCount: '10',
  });

  const starBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starBoxElement = starBoxRef.current;
    if (!starBoxElement) return;
    let isSelected = false;

    starBoxElement.addEventListener('mousedown', () => {
      isSelected = true;
    });

    starBoxElement.addEventListener('mouseup', () => {
      isSelected = false;
    });

    starBoxElement.addEventListener('mouseleave', () => {
      isSelected = false;
    });

    starBoxElement.addEventListener(
      'mousemove',
      (e) => {
        const starBoxWidth = starBoxElement.offsetWidth;
        const offsetX = e.clientX - starBoxElement.getBoundingClientRect().x;

        if (isSelected) {
          const rate = offsetX / starBoxWidth;

          setFormData((prevFormData) => {
            const max = +prevFormData.max;
            const calculatedNow = Math.ceil(max * rate);
            return {
              ...prevFormData,
              now: `${
                calculatedNow < 0
                  ? 0
                  : calculatedNow > max
                  ? max
                  : calculatedNow
              }`,
            };
          });
        }
      },
      false
    );

    starBoxElement.addEventListener('touchmove', (e) => {
      const starBoxWidth = starBoxElement.offsetWidth;
      const { targetTouches } = e;
      const offsetX =
        targetTouches[0].clientX - starBoxElement.getBoundingClientRect().x;
      const rate = offsetX / starBoxWidth;

      setFormData((prevFormData) => {
        const max = +prevFormData.max;
        const calculatedNow = Math.ceil(max * rate);
        return {
          ...prevFormData,
          now: `${
            calculatedNow < 0 ? 0 : calculatedNow > max ? max : calculatedNow
          }`,
        };
      });
    });
  }, [setFormData]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!numberRegex.test(value)) return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    formData,
    changeHandler,
    starBoxRef,
  };
};
