import LoadingSection from "@/components/global/LoadingSection";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApproveOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/order/orderApi";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ManageOrders() {
  const { data, error, isLoading } = useGetAllOrdersQuery(undefined);
  const [approveOrder] = useApproveOrderMutation();

  if (isLoading) return <LoadingSection />;
  if (error) return <div>Error occurred in getting orders</div>;

  // Calculate total paid amount
  const totalPaidAmount = data?.data?.reduce(
    (total: number, order: IOrder) => total + order.paidAmount,
    0
  );

  // Handle approve order
  const handleApproveOrder = async (orderId: string) => {
    try {
      const res = await approveOrder(orderId).unwrap();

      if (res.status) {
        toast("Order approved successfully");
      }
    } catch (error) {
      console.error("Failed to approve order:", error);
    }
  };

  return (
    <div className="w-[300px] sm:w-full mx-auto md:p-4">
      <Table className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <TableCaption className="text-gray-600 dark:text-gray-400"></TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
              Transaction ID
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
              Order Summary
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
              Status
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
              Paid Amount
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((order: IOrder) => (
            <TableRow
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {`${order.txId.slice(0, 5)}***${order.txId.slice(-3)}`}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </span>{" "}
                      -{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        {item.purchaseQuantity} x ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Pending"
                      ? "outline"
                      : order.status === "Shipping"
                      ? "secondary"
                      : "destructive"
                  }
                  className="whitespace-nowrap"
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-gray-900 dark:text-gray-100">
                ${order.paidAmount}
              </TableCell>
              <TableCell className="text-right">
                {order.status === "Pending" ? (
                  <Button
                    size="sm"
                    onClick={() => handleApproveOrder(order._id)}
                    className="bg-yellow-400 hover:bg-yellow-700 text-black"
                  >
                    Approve
                  </Button>
                ) : (
                  <span className="bg-green-500 text-black text-sm font-medium px-2.5 py-1 rounded-full ">
                    Approved
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              className="font-semibold text-gray-900 dark:text-gray-100"
            >
              Total Paid Amount
            </TableCell>
            <TableCell className="text-right font-semibold text-gray-900 dark:text-gray-100">
              ${totalPaidAmount?.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
