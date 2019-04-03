// META: title=Blob Array Buffer
// META: script=../support/Blob.js
'use strict';

promise_test(async () => {
  const input_arr = new TextEncoder("utf-8").encode("PASS");
  const blob = new Blob([input_arr]);
  const array_buffer = await blob.arrayBuffer();
  assert_true(array_buffer instanceof ArrayBuffer);
  assert_equals_typed_array(new Uint8Array(array_buffer), input_arr);
}, "Blob.arrayBuffer()")

promise_test(async () => {
  const input_arr = new TextEncoder("utf-8").encode("");
  const blob = new Blob([input_arr]);
  const array_buffer = await blob.arrayBuffer();
  assert_true(array_buffer instanceof ArrayBuffer);
  assert_equals_typed_array(new Uint8Array(array_buffer), input_arr);
}, "Blob.arrayBuffer() empty Blob data")

promise_test(async () => {
  const input_arr = new TextEncoder("utf-8").encode("\uFFFD\u000a");
  const blob = new Blob([input_arr]);
  const array_buffer = await blob.arrayBuffer();
  assert_equals_typed_array(new Uint8Array(array_buffer), input_arr);
}, "Blob.arrayBuffer() non-ascii input")

promise_test(async () => {
  const input_arr = [8, 241, 48, 123, 151];
  const typed_arr = new Uint8Array(input_arr);
  const blob = new Blob([typed_arr]);
  const array_buffer = await blob.arrayBuffer();
  assert_equals_typed_array(new Uint8Array(array_buffer), typed_arr);
}, "Blob.stream() non-unicode input")
