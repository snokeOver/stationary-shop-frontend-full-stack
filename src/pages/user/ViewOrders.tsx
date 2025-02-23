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
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { Badge } from "@/components/ui/badge"; // For status badges// For date formatting
import { IOrder } from "@/types";

export default function ViewOrders() {
  const { data, error, isLoading } = useGetAllOrdersQuery(undefined);

  if (isLoading)
    return (
      <>
        <LoadingSection />
      </>
    );
  if (error) return <div>Error occured in getting orders</div>;

  // Calculate total paid amount
  const totalPaidAmount = data?.data?.reduce(
    (total: number, order: IOrder) => total + order.paidAmount,
    0
  );
  console.log(data.data);

  return (
    <div className="w-[300px] sm:w-full mx-auto">
      <Table className="bg-gray-200 dark:bg-gray-800">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Order Summary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Paid Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((order: IOrder) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">
                {`${order.txId.slice(0, 5)}***${order.txId.slice(-3)}`}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{item.name}</span> -{" "}
                      <span className="text-gray-500">
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
                      ? "default"
                      : order.status === "Shipping"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${order.paidAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Paid Amount</TableCell>
            <TableCell className="text-right">
              ${totalPaidAmount?.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
