module ApplicationHelper
  def update_query_params new_values
    request.query_parameters.merge new_values
  end
end
