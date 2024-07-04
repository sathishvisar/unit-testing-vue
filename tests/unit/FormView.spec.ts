import { VueWrapper, mount } from "@vue/test-utils";
import FormView from "@/views/FormView.vue";

describe("FormView.vue", () => {
  let wrapper: VueWrapper<InstanceType<typeof FormView>>;

  beforeAll(() => {
    wrapper = mount(FormView);
  });

  it("login without username & password", async () => {
    console.log("HTML structure of the wrapper:", wrapper.html());
    // Find input elements
    // Select elements based on the IDs used in the template
    const inputEmail = wrapper.find('#email-input');
    const inputPassword = wrapper.find('#password-input');

    // Check if the elements exist before interacting with them
    expect(inputEmail.exists()).toBe(true);
    expect(inputPassword.exists()).toBe(true);


  });
});
