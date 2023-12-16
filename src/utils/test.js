export default function test(input) {
  var res = { status: false, error: "" };

  if (input.includes("0")) {
    return (res = { status: true, error: "" });
  } else {
    return (res = { status: false, error: "Khong duoc de trong" });
  }
}
