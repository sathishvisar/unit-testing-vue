import { VueWrapper, mount } from "@vue/test-utils";
import FormView from "@/views/FormView.vue";

describe("FormView.vue", () => {
  let wrapper: VueWrapper;

  beforeAll(() => {
    wrapper = mount(FormView);
  });

  it("login wihout username & password", async () => {
    const inputUsername = wrapper.find('input[type="text"]');
    const inputPassword = wrapper.find('input[type="text"]');
    const btnCancel = wrapper.find('button[name="cancel"]');
    // const btnLogin = wrapper.find('button[name="login"]');

    inputUsername.setValue("admin");
    inputPassword.setValue("Admin@123#");

    await btnCancel.trigger("click");

    console.log(inputUsername.element);
  });
});
