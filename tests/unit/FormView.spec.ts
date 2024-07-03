import { VueWrapper, mount } from "@vue/test-utils";
import FormView from "@/views/FormView.vue";

describe("FormView.vue", () => {
  // @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>;

  beforeAll(() => {
    wrapper = mount(FormView);
  });

  it("login without username & password", async () => {
    // Debugging: Log the HTML of the mounted component
    console.log(wrapper.html());

    // Find input elements
    const inputUsername = wrapper.find('input[type="text"]');
    const inputPassword = wrapper.find('input[type="password"]');
    const btnCancel = wrapper.find('button[name="cancel"]');

    // Debugging: Log the found elements
    console.log("Input Username:", inputUsername.exists());
    console.log("Input Password:", inputPassword.exists());
    console.log("Cancel Button:", btnCancel.exists());

    // Add your assertions here based on the expected behavior after cancel click
  });
});
