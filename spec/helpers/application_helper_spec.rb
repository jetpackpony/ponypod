require "rails_helper"

describe ApplicationHelper do
  describe "#update_query_params" do
    it "returns a new query params hash with updated values" do
      query_params = { one: "one", two: "two", three: "three" }
      new_values = { one: "new_one", three: "new_three" }
      expected_result = { one: "new_one", two: "two", three: "new_three" }

      allow(controller.request).to receive(:query_parameters).and_return(query_params)
      expect(helper.update_query_params(new_values)).to eq(expected_result)
    end
  end
end
