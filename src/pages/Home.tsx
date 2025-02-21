import { Button } from "@/components/ui/button";
import { useAppDispatch, useCounterSelector } from "@/hooks/useApp";
import { decrement, increment } from "@/redux/counterSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const { count } = useCounterSelector();

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount));
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <Button
            variant={"outline"}
            onClick={() => handleIncrement(5)}
            className=""
          >
            By 5
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => handleIncrement(1)}
            className=""
          >
            +1
          </Button>
        </div>
        <div className="border text-center w-[100px]">
          <p>{count}</p>
        </div>
        <div>
          <Button variant={"outline"} onClick={handleDecrement} className="">
            -1
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
