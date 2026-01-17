import { useEffect } from 'react';

export function useOutsideClick(ref, handler, excludeRef) {
    useEffect(() => {
        const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            
            // Do nothing if clicking the excluded element
            if (excludeRef?.current && excludeRef.current.contains(event.target)) {
                return;
            }
            
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, excludeRef]);
}