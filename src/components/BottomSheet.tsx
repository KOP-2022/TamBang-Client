import { useEffect, useRef, useState } from 'react';
import Sheet, { type SheetRef } from 'react-modal-sheet';

interface BottomSheetProps {
  children: React.ReactNode;
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const sheetRef = useRef<SheetRef>();

  const snapTo = (i: number) => sheetRef.current?.snapTo(i);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
    setTimeout(() => {
      snapTo(1);
    }, 80);
  }, []);

  return (
    <Sheet
      isOpen={!isLoading}
      onClose={() => snapTo(1)}
      snapPoints={[-56, 40]}
      initialSnap={1}
      ref={sheetRef}
      onSnap={(index) => setOpen(!index)}
      className="max-w-lg mx-auto"
    >
      <Sheet.Container>
        <Sheet.Header onTap={() => snapTo(0)} />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      {isOpen ? <Sheet.Backdrop onTap={() => snapTo(1)} /> : <div></div>}
    </Sheet>
  );
};

export default BottomSheet;
